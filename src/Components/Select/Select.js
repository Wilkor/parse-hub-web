import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './select.scss';

import useOutsideClick from '../../hooks/useOutsideClick';
import Options from './components/Options';
import Chip from './components/Chip';

const BACKSPACE_KEY = 8;

const Select = ({
    icon,
    label,
    name,
    helper_message,
    selected = [],
    placeholder = 'Select...',
    multiple = false,
    searchable = false,
    disabled = false,
    show_clear = false,
    options = [],
    onChange = () => {}
}) => {
    const select_ref = useRef(null);
    const input_ref = useRef(null);
    const [showOptions, setShowOptions] = useState(false);
    const [optionsList, setOptionsList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');

    const select_class = classNames({
        'select-wrapper': true,
        danger: !!error,
        primary: !error,
        pressed: !!showOptions,
        'not-searchable': !searchable,
        disabled: !!disabled
    });

    const input_class = classNames({
        dib: true,
        absolute: !multiple
    });



    useEffect(() => {
        const prepare_options = options.map((option) => ({
            value: option.value,
            label: option.label,
            selected: !!option.selected
        }));

        setOptionsList(prepare_options);
    }, [options]);

    useEffect(() => {
        const options_selected = optionsList.filter((option) =>
            selected.includes(option.value)
        );
        setSelectedList(options_selected);
        // eslint-disable-next-line
    }, [selected]);

    useOutsideClick(select_ref, () => {
        if (showOptions) {
            const { current } = input_ref;
            current.blur();
            setShowOptions(false);
        }
    });

    const handleShowOptions = () => {
        const { current } = input_ref;
        showOptions ? current.blur() : current.focus();
        setShowOptions(!showOptions);
    };

    const handleSearch = (value) => {
        const { current } = input_ref;
        const size = (value.length + 2) * 8;
        const input_width = `${size}px`;
        current.style.width = input_width;
        setSearch(value);
    };

    const handleSelected = (value) => {
        const current_options = optionsList.map((option) => {
            if (multiple) {
                return {
                    ...option,
                    selected:
                        option.value === value
                            ? !option.selected
                            : option.selected
                };
            }
            return {
                ...option,
                selected: option.value === value
            };
        });

        const current_selected = optionsList.find(
            (option) => option.value === value
        );
        const is_selected = !!selectedList.find(
            (option) => option.value === value
        );

        let selected_list = [];

        if (is_selected) {
            selected_list = selectedList.filter(
                (option) => option.value !== value
            );
        } else if (multiple && !!current_selected) {
            selected_list = [...selectedList, current_selected];
        } else if (!!current_selected) {
            selected_list = [current_selected];
        }

        setSelectedList(selected_list);
        setOptionsList(current_options);
        resetInput();
        fallbackSelected(current_options);
    };

    const handleKeyboardClear = (e) => {
        if (e.keyCode === BACKSPACE_KEY && !search && multiple) {
            e.preventDefault();
            const last_selected_option = selectedList.slice().pop();

            handleSelected(last_selected_option.value);
        }
    };

    const resetInput = () => {
        const { current } = input_ref;
        current.style.width = '2px';
        current.value = '';
        setSearch('');
    };

    const fallbackSelected = (current_options) => {
        let result;

        if (multiple) {
            result = current_options
                .filter((item) => item.selected === true)
                .map((option) => option.value);
        } else {
            const current_selected = current_options.find(
                (option) => option.selected === true
            );
            result = !!current_selected ? current_selected.value : '';
        }

        onChange(result);
    };

    const renderIcon = () => (
        <div className="select-icon">
            <bds-icon name={icon} size="small" />
        </div>
    );

    const renderLabel = () => <label htmlFor={name}>{label}</label>;

    const renderPlaceholder = () => {
        const placeholder_class = classNames({
            'select-placeholder': true,
            'with-label': !!label
        });

        return !search && !selectedList.length ? (
            <div className={placeholder_class}>{placeholder}</div>
        ) : (
            <></>
        );
    };

    const renderSelected = () => {
        const single_selected_class = classNames({
            'hidden-selected': !!search,
            'bp-c-neutral-dark-city': true,
            f6: true
        });

        return multiple ? (
            selectedList.map((option) => (
                <Chip
                    key={`chip_${option.value}`}
                    data={option}
                    fallbackRemoveSelected={(value) => handleSelected(value)}
                />
            ))
        ) : (
            <span className={single_selected_class}>
                {!!selectedList.length && selectedList[0].label}
            </span>
        );
    };

    const renderError = () => (
        <div className="flex items-center pa1 bp-c-delete">
            <bds-icon name="error" theme="solid" size="x-small" />
            <span className="f7 ml1">{error}</span>
        </div>
    );

    const renderHelperMessage = () => (
        <div className="flex items-center bp-c-neutral-medium-cloud mt2">
            <bds-icon name="info" theme="solid" size="x-small" />
            <span className="f7 ml1">{helper_message}</span>
        </div>
    );

    return (
        <div
            ref={select_ref}
            className="wrapper"
            onClick={() => !disabled && handleShowOptions()}
            data-testid="select-button"
        >
            <div
                className={select_class}
                role="button"
                aria-expanded={showOptions}
            >
                {!!icon && renderIcon()}
                <div className="input-wrapper">
                    {!!label && renderLabel()}
                    <div className="input-container">
                        {renderPlaceholder()}
                        {!!selectedList && renderSelected()}
                        <div className={input_class}>
                            <input
                                ref={input_ref}
                                type="text"
                                name={name}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck="false"
                                aria-autocomplete="list"
                                onInput={(e) =>
                                    searchable &&
                                    !disabled &&
                                    handleSearch(e.target.value)
                                }
                                onKeyDown={(e) => handleKeyboardClear(e)}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </div>
                {!!selectedList.length && show_clear && (
                    <div className="select-clear mr1" title="Limpar">
                        <bds-icon
                            name="error"
                            theme="solid"
                            size="x-small"
                            onClick={() => handleSelected()}
                        />
                    </div>
                )}
                <div className="select-arrow">
                    <bds-icon
                        name={showOptions ? 'arrow-up' : 'arrow-down'}
                        size="small"
                        theme="outline"
                    />
                </div>
            </div>
            <Options
                options={optionsList}
                search={search}
                show={showOptions}
                multiple={multiple}
                fallbackSelected={handleSelected}
            />
            {!!helper_message && !error && renderHelperMessage()}
            {!!error && renderError()}
        </div>
    );
};

Select.propTypes = {
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    helper_message: PropTypes.string,
    multiple: PropTypes.bool,
    searchable: PropTypes.bool,
    disabled: PropTypes.bool,
    show_clear: PropTypes.bool,
    options: PropTypes.array,
    selected: PropTypes.any,
    errors: PropTypes.object,
    touched: PropTypes.object,
    onChange: PropTypes.func
};

export default Select;
