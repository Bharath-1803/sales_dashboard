import React from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import styled from 'styled-components';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    icon: {
        color: '#008392'
    },
}));

const StyledFormComponent = styled(FormControl)`
width: ${p => p.width};
min-width: ${p => p.minWidth};
grid-row: 2/3;

height: calc(${p => p.height} - 5px);
input {
    height: ${p => p.height};
}
div {
    height: 100%;
    padding: calc(${p => p.height} - 30px) 5px;
}
fieldset {
    height: ${p => p.height};
}
legend {
    max-width: 0px;
}
`;

export const SelectDropdown = ({
    onChange,
    options = [],
    value = '',
    variant = 'outlined',
    label = 'default',
    name = '',
    displayEmpty = true,
    height = '40px',
    width = '100%',
    minWidth = '150px',
    defaultLabel = 'Select',
    renderCustomMenuItems = null,
    autoWidth = false,
    disabled = false,
    multiple = false,
    renderValue = null,
    placeholder,
    additionalValues,
    ...props
}) => {

    const classes = useStyles();

    const handleSelectChange = event => {
        if (event.target.value === value) {
            return;
        }
        if (additionalValues && additionalValues[value] && onChange) {
            onChange(event.target.value, event.target.name, additionalValues[value]);
        } else if (onChange) {
            onChange(event.target.value, event.target.name);
        }
    };

    let renderLabel = null;

    if (defaultLabel && !renderValue && !value) {
        renderLabel = defaultLabel;
    } else {
        renderLabel = renderValue;
    }

    return (
        <StyledFormComponent height={height} width={width} minWidth={minWidth} disabled={disabled}>
            <Select
                value={value}
                onChange={handleSelectChange}
                label={label}
                variant={variant}
                name={name}
                autoWidth={autoWidth}
                displayEmpty={displayEmpty}
                multiple={multiple}
                // renderValue={renderLabel}
                IconComponent={ExpandMore}
                inputProps={{
                    classes: {
                        icon: classes.icon,
                    },
                }}
                MenuProps={{
                    getContentAnchorEl: null,
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left'
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'left',
                    }
                }}
                {...props}
            >
                {renderCustomMenuItems ? renderCustomMenuItems() :
                    Array.isArray(options) &&
                    options.map(option => {
                        if (typeof option !== 'object') {
                            return null;
                        }
                        return (
                            <MenuItem
                                value={option.value}
                                key={option.value ? option.value : 'default'}
                            >
                                {option.label}
                            </MenuItem>
                        );
                    })}
            </Select>
        </StyledFormComponent>
    )
}

export const selectDropdownProptypes = Select.propTypes;
export const selectDropdownDefaults = Select.defaultProps;

SelectDropdown.propTypes = {
    ...selectDropdownProptypes
};

SelectDropdown.defaultProps = {
    ...selectDropdownDefaults
};
