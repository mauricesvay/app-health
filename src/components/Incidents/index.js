import React, {Component} from 'react';
import Incident from './Incident';
import './Incidents.css';

class Incidents extends Component {
    renderItems() {
        if (!this.props.incidents || this.props.incidents.length === 0) {
            return <div className="Incidents__empty">No incidents</div>;
        }

        const rows = this.props.incidents.map((incident) => {
            return <Incident incident={incident} key={incident._id} />;
        });

        return (
            <table className="Incidents__list">
                <thead>
                    <tr>
                        <th>Incident</th>
                        <th>Source</th>
                        <th>Started</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="Incidents block">
                <h1 className="block__title">Incidents</h1>
                {this.renderItems()}
            </div>
        );
    }
}

export default Incidents;
