import styled from "styled-components";
import BaseContainer from "../BaseContainer";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row wrap;
  position: relative;
`;

const Dropdown = styled.div<{ dropdownMarginTop: number }>`
  width: 100%;
  background: white;
  position: absolute;
  top: ${(props) => props.dropdownMarginTop}px;
  z-index: 100;
  display: flex;
  max-height: 300px;
  flex-flow: column;
  overflow-y: auto;
  overflow-x: hidden;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  left: -1px;
`;

const DropdownItem = styled.div`
  width: 100%;
  padding: 10px 10px;
  font-size: 10px;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }
  &.selected {
    background: rgba(0, 0, 0, 0.06);
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  padding-right: 20px;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
  cursor: pointer;
  &::placeholder {
    color: rgba(0, 0, 0, 0.8);
    transition: color 0.2s ease;
  }
  &:focus {
    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const ClearBTN = styled.button`
  transform: scale(0.85);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.18);
  position: absolute;
  border: none;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: white;
  top: calc((100% - 15px) / 2);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.25);
  }
`;

const SearchBar = ({
  style,
  inputStyle,
  dropdownStyle,
  noResultText = "No result",
  data = [],
  withDropdown = false,
  dropdownMarginTop = 0,
  onSubmit,
  onFocus,
}: {
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  noResultText?: string;
  data?: string[];
  withDropdown?: boolean;
  dropdownMarginTop?: number;
  onSubmit: (value: string) => void;
  onFocus?: ($isFocus: boolean) => void;
}) => {
  const [$isFocus, setFocus] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [suggestionValues, setSuggestionValues] = useState<Array<string>>([]);

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
    if (withDropdown && data && data.length > 0) {
      const newSuggestionValues: Array<string> = [];
      data.forEach((value) => {
        if (value.toUpperCase().includes(e.target.value.toUpperCase())) {
          newSuggestionValues.push(value);
        }
      });
      setSuggestionValues(newSuggestionValues);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    onSubmit(searchStr);
    setFocus(false);
    e.preventDefault();
  };

  useEffect(() => {
    if (onFocus) onFocus($isFocus);
  }, [$isFocus, onFocus]);

  useEffect(() => {
    if (withDropdown && data && data.length > 0) {
      setSuggestionValues(data);
    }
  }, [data, withDropdown]);

  return (
    <Container style={style} onSubmit={(e) => handleSubmit(e)}>
      <Input
        style={inputStyle}
        placeholder="Search"
        value={searchStr}
        onChange={(e) => handleChangeSearchInput(e)}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false);
          }, 200);
        }}
      />

      {searchStr?.length > 0 && (
        <ClearBTN
          onClick={() => {
            setSearchStr("");
            setSuggestionValues(data);
            onSubmit("");
          }}
        >
          <CloseOutlined />
        </ClearBTN>
      )}
      {withDropdown && $isFocus && (
        <Dropdown dropdownMarginTop={dropdownMarginTop} style={dropdownStyle}>
          {suggestionValues?.length > 0 &&
            suggestionValues.map((value) => (
              <DropdownItem
                className={value === searchStr ? "selected" : ""}
                onClick={() => {
                  setSearchStr(value);
                  onSubmit(value);
                }}
                key={value}
              >
                {value}
              </DropdownItem>
            ))}
          {suggestionValues?.length === 0 && (
            <DropdownItem style={{ opacity: 0.7 }}>{noResultText}</DropdownItem>
          )}
        </Dropdown>
      )}
    </Container>
  );
};

export default SearchBar;
