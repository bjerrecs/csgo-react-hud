import React from 'react';
import {configs, actions} from './../../App';
import tournament from './../../assets/tournament.svg';

export default class EventBar extends React.Component<any, { title: string, content: string, show: boolean  }> {
	constructor(props: any) {
		super(props);
		this.state = {
            title:'Title',
            content:'Content',
            show: false
		}
	}

	componentDidMount() {
        configs.onChange((data:any) => {
            if(!data) return;
            const event = data.event;
            if(!event) return;

            if(event.title && event.content){
                this.setState({title:event.title, content:event.content})
            }
        });
        actions.on("eventState", (state: any) => {
            this.setState({show: state === "show"})
        });
        actions.on("eventTrivia", () => {
            this.setState({show: !this.state.show})
        });
	}
	
	render() {
		return (
			<>
                <div id={`top-matchbar`}>
                    <div className="bar">
                        <span id={`event`}>
                            {this.state.title}
                        </span>
                        <span id={`logo`}>
                            <img src={tournament} alt="logo" className="tournamentIcon"/>
                        </span>
                        <span id={`status`}>
                            {this.state.content}
                        </span>
                    </div>
                </div>
            </>
		);
	}

}
