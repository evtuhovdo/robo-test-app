import React from 'react';
import Input, { InputAdornment } from 'material-ui/Input';
import SearchLensIcon from 'material-ui-icons/Search';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import Zoom from 'material-ui/transitions/Zoom';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

const style = {
  icon: {
    color: '#737373',
  },
};

const SearchInput = (props) => {
  const {
    ref, value, onClearInputValue, onSearchDo, ...other
  } = props;

  const notEmptyValue = value !== '';

  const handleClearValueClick = () => {
    if (isFunction(onClearInputValue)) {
      onClearInputValue();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && value !== '') {
      if (isFunction(onSearchDo)) {
        onSearchDo();
      }
    }
  };

  return (
    <Input
      fullWidth
      type="text"
      inputRef={ref}
      onKeyPress={handleKeyPress}
      startAdornment={
        <InputAdornment position="start" style={style.icon}>
          <SearchLensIcon />
        </InputAdornment>
      }
      endAdornment={
        <Zoom in={notEmptyValue}>
          <InputAdornment position="end" style={style.icon}>
            <IconButton onClick={handleClearValueClick}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        </Zoom>
      }
      value={value}
      {...other}
    />
  );
};

SearchInput.propTypes = {
  onClearInputValue: PropTypes.func,
  onSearchDo: PropTypes.func,
};

SearchInput.defaultProps = {
  onClearInputValue: () => {},
  onSearchDo: () => {},
};

export default SearchInput;
