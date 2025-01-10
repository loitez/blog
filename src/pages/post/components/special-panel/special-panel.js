import styled from "styled-components";
import { Icon, IconButton } from "../../../../components";

const SpecialPanelContainer = ({ className, publishedAt, primaryButton }) => {
  return (
    <div className={className}>
      <div className="published-at">
        <Icon margin="0 10px 0 0" size="18px" id="fa-calendar-o" />
        {publishedAt}
      </div>
      <div>
        {primaryButton}
        <IconButton title="Удалить статью" deleteitem>
          <Icon size="21px" id="fa-trash-o" />
        </IconButton>
      </div>
    </div>
  );
};

export const SpecialPanel = styled(SpecialPanelContainer)`
  margin-bottom: 20px;
  font-size: 19px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .published-at {
    display: flex;
    align-items: center;
  }
`;
