import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import logoImage from '../../assets/logo.svg'

import './style.css';


export default function Profile() {

    const history = useHistory();
    const [incidents, setIncidents] = useState([])
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ongId
            }
        })
    }, [ongId]).then((response) => {
        setIncidents(response.data)
    });

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`,{
                headers:{
                    authorization:ongId
                }
            })
            setIncidents(incidents.filter(incident=>incident.id!==id))
        } catch (error) {
            alert('erro ao deletar')
        }
    }


   function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be the hero" />
                <span>Bem Vindo(a) {ongName}</span>

                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color='#E02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={()=>handleDeleteIncident(incident.id)}><FiTrash2 size={20} color="#a8a8b3" /></button>
                    </li>
                ))

                }
            </ul>

        </div>
    );
}