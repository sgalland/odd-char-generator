'use strict';
import { useState, useRef } from 'react';
import './App.css';
import { NumericTextBox, TextBox } from './common/components';
import { initChar } from './chargen';
import './custom.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import Form from 'react-bootstrap/Form';

const RollLog = ({ log }) => {
  const counter = useRef(0);
  return (
    <>
      {log ? log.map(l => <Row key={`${counter.current++}`}>{l}</Row>) : null}
    </>
  );
}

const App = () => {
  const [log, setLog] = useState([]);
  const [character, _] = useState(() => initChar(setLog));

  const handleOnChange = () => { }

  return (
    <Form>
      <ThemeProvider>
        <Container fluid>
          <Row>
            <Col xxl={1} lg={1} md={3} sm={5} xs={6}>
              <NumericTextBox label={'STR'} value={character.STR} onChange={handleOnChange} />
              <NumericTextBox label={'INT'} value={character.INT} onChange={handleOnChange} />
              <NumericTextBox label={'WIS'} value={character.WIS} onChange={handleOnChange} />
              <NumericTextBox label={'DEX'} value={character.DEX} onChange={handleOnChange} />
              <NumericTextBox label={'CHA'} value={character.CHA} onChange={handleOnChange} />
              <NumericTextBox label={'CON'} value={character.CON} onChange={handleOnChange} />
              <TextBox label={'Class'} style={{ width: 80 }} value={character.charClass} />
            </Col>
            <Col>
              <RollLog log={log} />
            </Col>
          </Row>
        </Container>
      </ThemeProvider>
    </Form>
  );
}

export default App;
