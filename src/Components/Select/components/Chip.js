import React from 'react';
import PropTypes from 'prop-types';
import '../select.scss';

const Chip = ({ data, fallbackRemoveSelected = () => {} }) => {
    const handleClick = (e) => {
        fallbackRemoveSelected(data.value);
        e.stopPropagation();
    };

    return (
        <div className="chip-container">
            <div className="chip-label">{data.label}</div>
            <div className="chip-delete" onClick={(e) => handleClick(e)}>
                <bds-icon name="error" size="x-small" theme="solid" />
            </div>
        </div>
    );
};

Chip.propTypes = {
    data: PropTypes.object,
    fallbackRemoveSelected: PropTypes.func
};

export default Chip;
