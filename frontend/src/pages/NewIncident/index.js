import React,{useState} from 'react';

import { FiArrowLeft } from 'react-icons/fi'
import { Link,useHistory } from 'react-router-dom';

import api from '../../services/api'

import logoHeroes from '../../assets/logo.svg';

import './style.css';

export default function NewIncident() {
    const history = useHistory();
    const[title,setTitle]=useState('');
    const[description,setDescription]=useState('');
    const[value,setValue]=useState('');
    const ongId = localStorage.getItem('ongId');
    async function hadleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents',data,{
                headers:{
                    authorization:ongId
                }
            })
            history.push('profile');
        } catch (error) {
            alert('erro ao cadastrar')
        }
    }

    return (<div className="newIncident-container">
        <div className="content">
            <section>
                <img src={logoHeroes} alt="Be the hero" />
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói que resolva o caso!</p>
                <Link to="/profile" className="back-link">
                    <FiArrowLeft size={16} color="#E02041" />Voltar para Home
            </Link>
            </section>
            <form onSubmit={hadleNewIncident}>
                <input 
                placeholder="Titulo do caso" 
                value={title}
                onChange={setTitle((e)=>e.target.value)}
                />
                <textarea 
                placeholder="Descrição" 
                value={description}
                onChange={setDescription((e)=>e.target.value)}
                />
                <input 
                placeholder="Valor em Reais" 
                value={value}
                onChange={setValue((e)=>e.target.value)}
                />
                
                <button type="submit" className="button">Cadastrar</button>

            </form>
        </div>
    </div>
    );
}