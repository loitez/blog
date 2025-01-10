import styled from "styled-components";
import { Button } from "../button/button";
import { useSelector } from "react-redux";
import {
  selectModalIsOpen,
  selectModalOnCancel,
  selectModalOnConfirm,
  selectModalText,
} from "../../selectors";

const ModalContainer = ({ className }) => {
  const text = useSelector(selectModalText);
  const isOpen = useSelector(selectModalIsOpen);
  const onConfirm = useSelector(selectModalOnConfirm);
  const onCancel = useSelector(selectModalOnCancel);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={className}>
      <div className="overlay"></div>
      <div className="box">
        <h3>{text}</h3>
        <div className="buttons">
          <Button onClick={onConfirm}>Да</Button>
          <Button onClick={onCancel}>Отмена</Button>
        </div>
      </div>
    </div>
  );
};

export const Modal = styled(ModalContainer)`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 20;

  & .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }
  & .box {
    position: relative;
    background-color: #fff;
    padding: 20px 20px 40px 20px;
    width: 500px;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .buttons {
      display: flex;
      justify-content: center;
      & button {
        padding: 5px 40px;
        &:not(:last-of-type) {
          margin-right: 15px;
        }
      }
    }
    // z-index: 30;
  }
`;
