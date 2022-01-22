import React from "react";
import { Player } from "csgogsi-socket";
import Weapon from "./../Weapon/Weapon";
import Avatar from "./Avatar";
import TeamLogo from "./../MatchBar/TeamLogo";
import "./observed.scss";
import { ArmorHelmet, ArmorFull, HealthFull } from './../../assets/Icons';
import { Veto } from "../../api/interfaces";
import { actions } from "../../App";

class Statistic extends React.PureComponent<{ label: string; value: string | number, }> {
	render() {
		return (
			<div className="stat">
				<div className="label">{this.props.label}</div>
				<div className="value">{this.props.value}</div>
			</div>
		);
	}
}

export default class Observed extends React.Component<{ player: Player | null, veto: Veto | null, round: number }, { showCam: boolean }> {
	constructor(props: any){
		super(props);
		this.state = {
		  showCam: true
		}
	  }
	componentDidMount() {
		actions.on('toggleCams', () => {
			console.log(this.state.showCam)
			this.setState({ showCam: !this.state.showCam });
		});
	}
	getAdr = () => {
		const { veto, player } = this.props;
		if (!player || !veto || !veto.rounds) return null;
		const damageInRounds = veto.rounds.map(round => round.players[player.steamid]).filter(data => !!data).map(roundData => roundData.damage);
		return damageInRounds.reduce((a, b) => a + b, 0) / (this.props.round - 1);
	}
	render() {
		if (!this.props.player) return '';
		const { player } = this.props;
		const weapons = Object.values(player.weapons).map(weapon => ({ ...weapon, name: weapon.name.replace("weapon_", "") }));
		const currentWeapon = weapons.filter(weapon => weapon.state === "active")[0];
		const grenades = weapons.filter(weapon => weapon.type === "Grenade");
		const { stats } = player;
		const ratio = stats.deaths === 0 ? stats.kills : stats.kills / stats.deaths;
		return (
			<div className={`observed ${player.team.side}`}>

				<div className="avatar-box">
					<div className="imagefade">
						<span />
					</div>
					{<Avatar steamid={player.steamid} height={200} width={200} showCam={this.state.showCam} slot={player.observer_slot} />}
					<div className="health_armor_container">
						<div className="health-icon icon">
								<HealthFull />
						</div>
						<div className="health text">{player.state.health}</div>
						<div className="armor-icon icon">
							{player.state.helmet ? <ArmorHelmet /> : <ArmorFull />}
						</div>
						<div className="health text">{player.state.armor}</div>
					</div>
				</div>
				<div className="databox">
					<div className="fist-row">
					<TeamLogo team={player.team} height={35} width={35} /> <div className="username">{player.name}</div>
					<div className="grenade_container">
						{grenades.map(grenade => <React.Fragment key={`${player.steamid}_${grenade.name}_${grenade.ammo_reserve || 1}`}>
							<Weapon weapon={grenade.name} active={grenade.state === "active"} isGrenade />
							{
								grenade.ammo_reserve === 2 ? <Weapon weapon={grenade.name} active={grenade.state === "active"} isGrenade /> : null}
						</React.Fragment>)}
					</div>
					</div>
					<div className="second-row">
						<div className="statistics">
							<div className="bgcolor">
								<Statistic label={"K"} value={stats.kills} />
								<Statistic label={"A"} value={stats.assists} />
								<Statistic label={"D"} value={stats.deaths} />
								<Statistic label={"K/D"} value={ratio.toFixed(2)} />
							</div>
						</div>

						<div className="ammo">
							<div className="ammo_counter">
								<div className="ammo_clip">{(currentWeapon && currentWeapon.ammo_clip) || "-"}</div>
								<div className="ammo_reserve">/{(currentWeapon && currentWeapon.ammo_reserve) || "-"}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
