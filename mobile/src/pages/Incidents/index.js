import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

import Logo from '../../assets/logo.png';
import style from './styles';
import api from '../../services/api';


export default function Incidents() {


    const navigation = useNavigation();

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading,setLoading] = useState(false);
    const [page,setPage] = useState(1);

    async function loadIncidents() {
        if(loading) return;

        if(total>0 && incidents.length==total)return;

        setLoading(true);


        const response = api.get('incidents',{params:page});
        
        setTotal(response.header['x-total-count']);
        setIncidents([...incidents,...response.data]);
        setPage(page++);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    function navigationDetail(incident) {
        navigation.navigate('Detail', { incident })
    }


    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={Logo} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}>{total} Casos</Text>
                </Text>

            </View>
            <Text style={style.title}>Bem-vindo!</Text>
            <Text style={style.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList
                style={style.incidentList}
                data={[incidents]}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold = {0.2}
                renderItem={({ item: incident }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>Caso</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>

                        <Text style={style.incidentProperty}>Valor</Text>
                        <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident.value)}</Text>

                    </View>
                )}

            />


            <TouchableOpacity style={style.detailsButton} onPress={() => navigationDetail(incident)}>
                <Text style={style.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#E02041" />
            </TouchableOpacity>



        </View>
    );
}