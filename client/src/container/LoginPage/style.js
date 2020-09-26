import { Form } from 'formik'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const FormStyled = styled(Form)`
  width: 100%;
  margin-top: 10px;
`

export const Submit = styled(Button)`
  margin: 20px 0px 30px;
`
