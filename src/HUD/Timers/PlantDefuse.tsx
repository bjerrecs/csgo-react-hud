import React from "react";

import { Timer } from "../MatchBar/MatchBar";
import { Player } from "csgogsi";
interface IProps {
  timer: Timer | null;
  side: "right" | "left"
}

export default class Bomb extends React.Component<IProps> {
  getCaption = (type: "defusing" | "planting", player: Player | null) => {
    if(!player) return null;
    if(type === "defusing"){
      return <>
        <div className={'W'}>{player.name} <br/> is defusing</div>
      </>;
    }
    return <>
      <div className={'W'}>{player.name} <br/>is planting</div>
    </>;
  }
  render() {
    const { side, timer } = this.props;
    return (
      <div className={`defuse_plant_container ${side} ${timer && timer.active ? 'show' :'hide'}`}>
        {
          timer ?
          <div className={`defuse_plant_caption`}>
            {this.getCaption(timer.type, timer.player)}
          </div> : null
        }
          
          <div className="defuse_plant_bar" style={{ width: `${(timer && timer.width) || 0}%` }}></div>
      </div>
    );
  }
}
