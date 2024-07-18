import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';

const PtosVtas = ({
  setPtoVta,
  setPtoVtaList,
  ptoVtaList,
  ptoVta,
  colSize,
  setValidPV,
  all,
}) => {
  const getPv = async () => {
    await axios
      .get(UrlNodeServer.ptosVtaDir.sub.userPv, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('user-token'),
        },
      })
      .then((res) => {
        console.log('res :>> ', res);
        const respuesta = res.data;
        const status = parseInt(respuesta.status);
        if (status === 200) {
          const ptoVtaData = respuesta.body.data;

          setPtoVtaList(
            ptoVtaData.map((item, key) => {
              if (ptoVta.id === 0) {
                if (key === 0) {
                  setPtoVta(item);
                }
              }
              if (key === 0) {
                if (setValidPV) {
                  setValidPV(item);
                }
              }
              if (all === true && key === 0) {
                return (
                  <>
                    <option
                      value={JSON.stringify({ id: undefined })}
                      key={-1}
                    >{`Todos`}</option>
                    <option
                      value={JSON.stringify(item)}
                      key={key}
                    >{`(P.V.: ${item.pv}) ${item.direccion}`}</option>
                  </>
                );
              }
              return (
                <option
                  value={JSON.stringify(item)}
                  key={key}
                >{`(P.V.: ${item.pv}) ${item.direccion}`}</option>
              );
            }),
          );
        } else {
        }
      })
      .catch((error) => {
        console.log('error :>> ', error);
      });
  };

  useEffect(() => {
    getPv();
    // eslint-disable-next-line
  }, []);

  return (
    <Col md={colSize}>
      <Label for="ptoVtaTxt">Punto de Venta</Label>
      <FormGroup>
        <Input
          type="select"
          id="ptoVtaTxt"
          onChange={(e) => setPtoVta(JSON.parse(e.target.value))}
          value={JSON.stringify(ptoVta)}
        >
          {ptoVtaList}
        </Input>
      </FormGroup>
    </Col>
  );
};

export default PtosVtas;
