import React, {Component} from 'react';
import _ from 'lodash';

class CheckboxGroup extends Component {

    checkboxGroup() {
        let {label, options, input, onSelectionChanged} = this.props;
        // options ist ein Objekt mit ids, kein Array, deshalb wird lodash fuer das Mapping verwendet
        return _.map(options, (option) => {
            return (
                <div className="checkbox" key={option.id}>
                    <label>
                        <input type="checkbox"
                               name={input.name}
                               value={option.id}
                               checked={input.value.indexOf(option.id) !== -1}
                               onChange={(event) => {
                                   const newValue = [...input.value];
                                   if (event.target.checked) {
                                       newValue.push(option.id);
                                   } else {
                                       newValue.splice(newValue.indexOf(option.id), 1);
                                   }

                                   onSelectionChanged(newValue);
                                   return input.onChange(newValue);
                               }}/>
                        {option.name}
                    </label>
                </div>)
        });
    }

    render() {
        return (
            <div>
                {this.checkboxGroup()}
            </div>
        )
    }
}


export default CheckboxGroup;