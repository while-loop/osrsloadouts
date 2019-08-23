import React from 'react';
import './Loadout.css'
import ItemStore from "../../store/ItemStore";
import _ from 'lodash';

class Stats extends React.Component {

    static def = {
        head: {id: null, quantity: 1},
        cape: {id: null, quantity: 1},
        neck: {id: null, quantity: 1},
        ammo: {id: null, quantity: 1},
        weapon: {id: null, quantity: 1},
        body: {id: null, quantity: 1},
        shield: {id: null, quantity: 1},
        legs: {id: null, quantity: 1},
        hands: {id: null, quantity: 1},
        feet: {id: null, quantity: 1},
        ring: {id: null, quantity: 1},
    };

    state = {
        bonuses: this.zero(),
    };

    zero() {
        return {
            attack: {
                Stab: 0,
                Slash: 0,
                Crush: 0,
                Magic: 0,
                Range: 0,
            },
            defence: {
                Stab: 0,
                Slash: 0,
                Crush: 0,
                Magic: 0,
                Range: 0,
            },
            other: {
                meleeStr: 0,
                rangedStr: 0,
                magicDmg: 0,
                prayer: 0,
                magic: 0,
                range: 0,
            },
            target: {
                Undead: 0,
                Slayer: 0,
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (_.isEqual(this.props, prevProps)) {
            return;
        }

        this.calcBonuses(this.props.items);
    }

    componentDidMount() {
        this.calcBonuses(this.props.items);
    }

    async calcBonuses(items) {
        if (items == null)
            items = Stats.def;

        let bonuses = this.zero();

        for (let [key, value] of Object.entries(items)) {
            if (value == null || value.id == null || key == null) {
                continue;
            }

            let info = (await ItemStore.getItemInfo(value.id)).data;
            if (info.equipment == null) {
                continue;
            }

            let eq = info.equipment;
            bonuses.attack.Stab += eq.attack_stab;
            bonuses.attack.Slash += eq.attack_slash;
            bonuses.attack.Crush += eq.attack_crush;
            bonuses.attack.Magic += eq.attack_magic;
            bonuses.attack.Range += eq.attack_ranged;

            bonuses.defence.Stab += eq.defence_stab;
            bonuses.defence.Slash += eq.defence_slash;
            bonuses.defence.Crush += eq.defence_crush;
            bonuses.defence.Magic += eq.defence_magic;
            bonuses.defence.Range += eq.defence_ranged;

            bonuses.other.meleeStr += eq.melee_strength;
            bonuses.other.rangedStr += eq.ranged_strength;
            bonuses.other.magicDmg += eq.magic_damage;
            bonuses.other.prayer += eq.prayer;

            bonuses.target.Undead += 0;
            bonuses.target.Slayer += 0;
        }

        const count = this.state.count;
        this.setState({bonuses: bonuses, count: count + 1});
    }

    render() {
        const {bonuses} = this.state;

        return (
            <div className="Stats">
                <li>
                    Attack bonus
                    <ul>
                        {
                            Object.entries(bonuses.attack).map(([k, v]) => {
                                return <li key={k}>{k}: {this.plusminus(v)}</li>
                            })
                        }
                    </ul>
                </li>
                <li>
                    Defence bonus
                    <ul>
                        {
                            Object.entries(bonuses.defence).map(([k, v]) => {
                                return <li key={k}>{k}: {this.plusminus(v)}</li>
                            })
                        }
                    </ul>
                </li>
                <li>
                    Other bonuses
                    <ul>
                        <li>Melee strength: {this.plusminus(bonuses.other.meleeStr)}</li>
                        <li>Ranged strength: {this.plusminus(bonuses.other.rangedStr)}</li>
                        <li>Magic damage: {this.plusminus(bonuses.other.magicDmg)}%</li>
                        <li>Prayer: {this.plusminus(bonuses.other.prayer)}</li>
                    </ul>
                </li>
                {/*<li>*/}
                {/*    Target specific*/}
                {/*    <ul>*/}
                {/*        {*/}
                {/*            Object.entries(bonuses.target).map(([k, v]) => {*/}
                {/*                return <li key={k}>{k}: {v}%</li>*/}
                {/*            })*/}
                {/*        }*/}
                {/*    </ul>*/}
                {/*</li>*/}
            </div>
        );
    }

    plusminus(number) {
        let pre = '';
        if (number >= 0) {
            pre = '+';
        }

        return pre + number;
    }
}

export default Stats;


