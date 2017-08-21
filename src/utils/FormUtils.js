import React from 'react';
import {FormControl, ControlLabel, FormGroup} from "react-bootstrap";


export function FieldGroup({id, label, help, ...props}) {
    // eslint-disable-next-line
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help}
        </FormGroup>
    );
}