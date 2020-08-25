import React,{useState} from 'react';
import api from '../../services/api';


import './style.css';

import heroesImg from '../../assets/heroes.png';
import logoHeroes from '../../assets/logo.svg';

import {FiLogIn} from 'react-icons/fi';

import {Link, useHistory} from 'react-router-dom';

export default function Logon() {
    const [id,setId] = useState('');
    const history = useHistory()
    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions',{id});
            localStorage.setItem('ongName', );
            localStorage.setItem('ongId',response.data.name);
            history.push('/profile');
        } catch (error) {
            alert('LOGIN INVÁLIDO')            
        }

    }

    return (
        <div className="logon-container">
            <section className="from">
                <img src={logoHeroes} alt="Be the hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça o seu Logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e=>setId(e.target.value)}
                    />
                    <button className = "button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>

               

            </section>
            <img src={heroesImg} alt="Heroes hug"/>
        </div>



    );

}