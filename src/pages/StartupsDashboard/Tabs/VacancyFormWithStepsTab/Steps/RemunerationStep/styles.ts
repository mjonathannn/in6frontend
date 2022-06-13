import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 60px;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  label + div {
    margin-top: 34px;
  }
`;

export const BaseSalaryInputsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  width: 500px;
`;
