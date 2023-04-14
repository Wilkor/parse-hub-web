import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


const Options = ({
    options,
    search,
    show = false,
    multiple = false,
    fallbackSelected = () => {}
}) => {
    const options_class = classNames({
        'options-wrapper': true,
        open: !!show
    });

    const renderOptions = () => {
        const selected_filtered = multiple
            ? options.filter((option) => !option.selected)
            : options;
        const filtered = selected_filtered.filter((option) =>
            search.length
                ? option.label.toLowerCase().includes(`${search}`.toLowerCase())
                : option
        );

        return filtered.length ? (
            filtered.map((option, key) => (
                <div
                    key={`option_${option.value}_${key}`}
                    className="option-container"
                    onClick={() => fallbackSelected(option.value)}
                >
                    <p className="option truncate">{option.label}</p>
                </div>
            ))
        ) : (
            <div className="option-container">
                <p className="option">Not found</p>
            </div>
        );
    };

    return <div className={options_class}>{renderOptions()}</div>;
};

Options.propTypes = {
    show: PropTypes.bool,
    options: PropTypes.array,
    search: PropTypes.string,
    multiple: PropTypes.bool,
    fallbackSelected: PropTypes.func
};

export default Options;
