import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'
import './style.css'
import api from '../../services/api'


function TeacherForm() {
    const history = useHistory()
    const [newTeacherData, setNewTeacherData] = useState({
        name: "",
        avatar: "",
        whatsapp: "",
        bio: "",
        subject: "",
        cost: "",
        schedule: [
            { week_day: 0, from: '', to: '' }
        ]
    })

    const addNewScheduleItem = () => {
        setNewTeacherData({
            ...newTeacherData,
            schedule: [
                ...newTeacherData.schedule,
                { week_day: 0, from: '', to: '' }
        ]})
    }

    const handleOnChange = (e: any) => {
        const { name, value } = e.target
        setNewTeacherData({
            ...newTeacherData,
            [name]: value
        })
    }

    const handleOnChangeSchedules = (e: any, indexScheduleChanged: number) => {
        const { name, value } = e.target
        const updatedSchedules = newTeacherData.schedule.map((schedule, indexSchedule) => (
            indexScheduleChanged === indexSchedule ? { ...schedule, [name]: value } : schedule
        ))
        setNewTeacherData({
            ...newTeacherData,
            schedule: updatedSchedules
        })
    }

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault()
        api.post('classes', newTeacherData).then(() => {
            alert('cadastro realizado com sucesso')
            history.push('/')
        }).catch((err) => {
            alert(`erro: ${err} no cadastro`)
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleSubmitForm}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name="name" 
                            label="Nome completo" 
                            value={newTeacherData.name} 
                            onChange={handleOnChange} 
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar" 
                            value={newTeacherData.avatar} 
                            onChange={handleOnChange} 
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp" 
                            value={newTeacherData.whatsapp} 
                            onChange={handleOnChange} 
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia" 
                            value={newTeacherData.bio} 
                            onChange={handleOnChange} 
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={newTeacherData.subject}
                            onChange={handleOnChange}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Educação física', label: 'Educação física' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' }
                            ]}
                        />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={newTeacherData.cost}
                            onChange={handleOnChange}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button onClick={addNewScheduleItem} type="button">+ Novo horário</button>
                        </legend>
                        {newTeacherData.schedule.map((schedule, index) => {
                            return (
                                <div key={index} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={newTeacherData.schedule[index].week_day}
                                        onChange={e => handleOnChangeSchedules(e, index)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' }
                                        ]}
                                    />
                                    <Input 
                                        name="from" 
                                        label="Das" 
                                        type="time"
                                        value={newTeacherData.schedule[index].from}
                                        onChange={e => handleOnChangeSchedules(e, index)}
                                    />
                                    <Input 
                                        name="to" 
                                        label="Até" 
                                        type="time"
                                        value={newTeacherData.schedule[index].to}
                                        onChange={e => handleOnChangeSchedules(e, index)}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit" >
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}


export default TeacherForm