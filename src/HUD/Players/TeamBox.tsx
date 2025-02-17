import React from 'react';
import Player from './Player'
import * as I from 'csgogsi-socket';
import './players.scss';

interface Props {
  players: I.Player[],
  team: I.Team,
  side: 'right' | 'left',
  current: I.Player | null,
}

export default class TeamBox extends React.Component<Props> {
  render() {
    var i = -1;

    if (this.props.side === 'right') {
      i = 4;
    }
    return (
      <div className={`teambox ${this.props.team.side} ${this.props.side}`}>
        {this.props.players.map(player => <Player
          key={player.steamid}
          player={player}
          specNumber={++i}
          isObserved={!!(this.props.current && this.props.current.steamid === player.steamid)}
        />)}
      </div>
    );
  }
}
