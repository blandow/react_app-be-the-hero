import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'

import Logo from '../../assets/logo.png'
import style from './styles';
import * as MailComposer from 'expo-mail-composer';
export default function Incidents() {

    const route = useRoute();
    const navigation = useNavigation();

    const incident = rout.params.incident;

    const mensage = `olá ${incident.name} estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor em Reais:${Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL' }).format(incident.value)}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendemail() {
        MailComposer.composeAsync({
            subject: `heroí nome aqui${incident.title}`,
            recipient: [incident.email],
            body: mensage,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}?text=${mensage}`);

    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={Logo} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>


            <View style={style.incident}>
                <Text style={[style.incidentProperty, { marginTop: 0 }]}>ONG</Text>
                <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={style.incidentProperty}>Caso</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>

                <Text style={style.incidentProperty}>Valor</Text>
                <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(incident.value)}</Text>

            </View>

            <View style={contactBox}>
                <Text style={style.heroTitle}>Salve o Dia!</Text>
                <Text style={style.heroTitle}>Seja o herói deste caso.</Text>

                <Text style={style.heroDescription}>Entre em contato:</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendemail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>

                </View>
            </View>


        </View>


    );
}