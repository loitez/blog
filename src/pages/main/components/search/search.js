import styled from "styled-components";
import { Icon, Input } from "../../../../components";

const SearchContainer = ({
  className,
  searchPhrase,
  setShouldSearch,
  onChange,
}) => {
  return (
    <div className={className}>
      <Input value={searchPhrase} placeholder="Поиск..." onChange={onChange} />
      <div className="icon-wrapper">
        <Icon margin="0 10px 0 0" size="18px" id="fa-search" />
      </div>
    </div>
  );
};

export const Search = styled(SearchContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin: 0 auto 40px auto;
  position: relative;
  & input {
    margin-bottom: 0;
    padding-right: 40px;
  }
  & .icon-wrapper {
    position: absolute;
    right: 5px;
    outline: none;
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
  }
`;
