import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import './style.css'
import api from '../../services/api'


function TeacherList() {
    const [teachers, setTeachers] = useState([])
    const [filtersTeacher, setFiltersTeacher] = useState({
        subject: "",
        week_day: "",
        time: ""
    })

    const handleFiltersChange = (e: any) => {
        const { name, value } = e.target
        setFiltersTeacher({
            ...filtersTeacher,
            [name]: value
        })
    }

    const searchTeachers = async (e: FormEvent) => {
        e.preventDefault()
        const response = await api.get('classes', {
            params: filtersTeacher
        })
        setTeachers(response.data)
    }

    return (
        <div className="container" id="page-teacher-list">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers} >
                    <Select
                        name="subject"
                        label="Matéria"
                        value={filtersTeacher.subject}
                        onChange={handleFiltersChange}
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
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={filtersTeacher.week_day}
                        onChange={handleFiltersChange}
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
                        type="time" 
                        name="time" 
                        label="Hora"
                        value={filtersTeacher.time}
                        onChange={handleFiltersChange}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    )
}


export default TeacherList