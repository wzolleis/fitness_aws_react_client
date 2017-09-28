// @flow weak
import {FormControl, ControlLabel, FormGroup} from "react-bootstrap";
import React from 'react';

import type {Exercise} from '../types';


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

export function exerciseLabel(exercise: Exercise): string {
    return exercise.device + ' - ' + exercise.name;
}
