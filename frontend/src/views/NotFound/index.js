import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import NavigationBar from '../../components/NavigationBar';
import cryFace from '../../assets/images/cry.png';


export default function NotFound() {

    const history = useHistory();

    function goBack(e) {
        if (e) e.preventDefault();

        history.goBack();
    }

    return (
        <div>
            <NavigationBar />
            <div className="notfound-container">
                <div className="card">
                    <img className="card-img-top" src={cryFace} alt="Cry face" />
                    <div className="card-body">
                        <h4 className="card-title">404</h4>
                        <p className="card-text">Ops!!! O recurso que você está procurando não existe!</p>
                        <button type="button" className="btn btn-primary w-100" onClick={e => goBack()}>Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
