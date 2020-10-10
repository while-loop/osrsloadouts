import React from 'react';
import discord from './discord.png';
import github from './github.png';

const DISCORD_URL = 'https://discord.com/channels/@me/107680246739767296'
const DISCORD_USERNAME = 'while-loop#6157'
const GITHUB_URL = 'https://github.com/while-loop/osrsinvy/issues'
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
                <a href={DISCORD_URL} target='_blank' rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} src={discord} alt={"discord logo"} width={50}/></a>
                &nbsp;
                <a href={DISCORD_URL} target='_blank' rel="noopener noreferrer">{DISCORD_USERNAME}</a>
            </div>
            <br/>
            <div>
                <a href={GITHUB_URL} target='_blank' rel="noopener noreferrer"><img style={{verticalAlign: 'middle'}} src={github} alt={"github logo"} width={50}/></a>
                &nbsp;
                <a href={GITHUB_URL} target='_blank' rel="noopener noreferrer">{GITHUB_USERNAME}</a>
            </div>


        </div>
    );
}

export default Contact;
