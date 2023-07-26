import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import styles from './form.module.css';

const Form = () => {

    const navigate = useNavigate();

    const genresOptions = [
        {label: 'Action', value: 'Action'},
        {label: 'Indie', value: 'Indie'},
        {label: 'Adventure', value: 'Adventure'},
        {label: 'RPG', value: 'RPG'},
        {label: 'Strategy', value: 'Strategy'}, 
        {label: 'Shooter', value: 'Shooter'},
        {label: 'Casual', value: 'Casual'},
        {label: 'Simulation', value: 'Simulation'},
        {label: 'Puzzle', value: 'Puzzle'}, 
        {label: 'Arcade', value: 'Arcade'},
        {label: 'Platformer', value: 'Platformer'},
        {label: 'Racing', value: 'Racing'},
        {label: 'Sports', value: 'Sports'},
        {label: 'Fighting', value: 'Fighting'},
        {label: 'Family', value: 'Family'},
        {label: 'Board Games', value: 'Board Games'},
        {label: 'Educational', value: 'Educational'},
        {label: 'Card', value: 'Card'},   
        {label: 'Massively Multiplayer', value: 'Massively Multiplayer'},
    ];

    const [formData, setFormData] = useState({
        name: '',
        image: '',
        description: '',
        platforms: [],
        released: '',
        rating: '',
        genres: [],
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === 'platforms' ? value.split(',') : value,
        }));
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: [...prevFormData[name], event.target.value],
        }));
        } else {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: prevFormData[name].filter((genre) => genre !== event.target.value),
        }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/videogames', formData);
            setShowSuccessMessage(true);

            setTimeout(() => {
                setFormData({
                name: '',
                image: '',
                description: '',
                platforms: [],
                released: '',
                rating: '',
                genres: [],
                });
                setShowSuccessMessage(false);
            }, 3000);
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    function handleClose () {
        navigate('/home');
    };

    return (
        <div className={styles.background}>
            <button className={styles.buttonExit} onClick={handleClose}>Exit</button>
            <div className={styles.formContainer}>
            <h1 className={styles.title}>Create a New Video Game</h1>
            {showSuccessMessage && <div className={styles.successMessage}>Game created successfully</div>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                Name:
                <input className={styles.input} type="text" name="name" value={formData.name} onChange={handleInputChange}/>
                </label>
                <label className={styles.label}>
                Image URL:
                <input className={styles.input} type="text" name="image" value={formData.image} onChange={handleInputChange}/>
                </label>
                <label className={styles.label}>
                Description:
                <textarea className={styles.textarea} name="description" value={formData.description} onChange={handleInputChange}/>
                </label>
                <label className={styles.label}>
                Platforms:
                <input className={styles.input} type="text" name="platforms" value={formData.platforms} onChange={handleInputChange}/>
                </label>
                <label className={styles.label}>
                Released:
                <input className={styles.input} type="date" name="released" value={formData.released} onChange={handleInputChange}/>
                </label>
                <label className={styles.label}>
                Rating:
                <input className={styles.input} type="number" name="rating" value={formData.rating} onChange={handleInputChange}/>
                </label>
                <div className={styles.label}>
                <p>Select Genres:</p>
                <div className={styles.genresList}>
                    {genresOptions.map((genre) => (
                        <label className={styles.labelGenres} key={genre.value}>
                        {genre.label}
                        <input
                            type="checkbox"
                            name="genres"
                            value={genre.value}
                            checked={formData.genres.includes(genre.value)}
                            onChange={handleCheckboxChange}
                        />
                        </label>
                    ))}     
                </div>
                </div>
                <button type="submit" className={styles.button}>Create Game</button>
            </form>
            </div>
        </div>
    );
};

export default Form;
