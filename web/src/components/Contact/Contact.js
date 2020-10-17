import React from 'react';
import {faDiscord, faGithub} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const DISCORD_URL = 'https://discord.com/channels/@me/107680246739767296'
const DISCORD_SERVER_URL = 'https://discord.gg/t5VhtF'
const DISCORD_USERNAME = 'while-loop#6157'
const GITHUB_URL = 'https://github.com/while-loop/osrsloadouts/issues'
const GITHUB_USERNAME = 'while-loop'

function Contact() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        }}>
            <h1>Contact Me</h1>
            <div>
                <a href={DISCORD_SERVER_URL} target='_blank' rel="noopener noreferrer"><FontAwesomeIcon
                    size={"lg"}
                    icon={faDiscord}/>
                </a>
                &nbsp;&nbsp;
                <a href={DISCORD_SERVER_URL} target='_blank' rel="noopener noreferrer">OSRS Loadouts</a>
            </div>
            <br/>
            <div>
                <a href={DISCORD_URL} target='_blank' rel="noopener noreferrer"><FontAwesomeIcon
                    size={"lg"}
                    icon={faDiscord}/></a>
                &nbsp;&nbsp;
                <a href={DISCORD_URL} target='_blank' rel="noopener noreferrer">{DISCORD_USERNAME}</a>
            </div>
            <br/>
            <div>
                <a href={GITHUB_URL} target='_blank' rel="noopener noreferrer"><FontAwesomeIcon
                    size={"lg"}
                    icon={faGithub}/></a>
                &nbsp;&nbsp;
                <a href={GITHUB_URL} target='_blank' rel="noopener noreferrer">{GITHUB_USERNAME}</a>
            </div>


        </div>
    );
}

export default Contact;
