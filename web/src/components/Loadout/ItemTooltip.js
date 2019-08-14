import React from 'react';
import './Loadout.css'
import Tooltip from 'react-tippy';

class ItemTooltip extends React.Component {

    render() {
        const item = this.props.item;
        if (item == null) {
            return null;
        }

        const id = item.id;
        const name = item.name;

        const clear = <div className='osrstooltip-clear'/>;
        const imgUrl = `https://www.osrsbox.com/osrsbox-db/items-icons/${id}.png`;

        let img = <span className='osrstooltip-image'><img src={imgUrl} alt={name}/></span>;
        var header = <span className='osrstooltip-name'>{name}</span>;

        let a =
            <div style={{zIndex: 99}}>
                <h1>yto</h1>
                <b>noo</b>
            </div>;

        return (
            <Tooltip html={a}>
                {this.props.children}
            </Tooltip>
        );

    }
}

export default ItemTooltip;