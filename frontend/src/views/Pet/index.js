import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import './styles.css';
import NavigationBar from '../../components/NavigationBar';
import api from '../../services/api';

export default function Pet() {
  const { id } = useParams();

  const [refreshPage, setRefreshpage] = useState(0);
  const [animals, setAnimals] = useState([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [animal, setAnimal] = useState('');
  const [animalName, setAnimalName] = useState('');
  const { addToast } = useToasts();

  const [showModal, setShowModal] = useState(false);
  function toggleModal() {
    setShowModal(!showModal);
    if (!showModal) {
      getAnimals();
    }
  }

  const history = useHistory();

  function updatePet(e) {
    if (e) e.preventDefault();
    api.patch(`pets/${id}`, {
      name, color, animal
    })
      .then(response => {
        setRefreshpage(refreshPage + 1)
        addToast('Pessoa salva com sucesso', { appearance: 'success' });
      })
      .catch(e => {
        addToast(e.response.data.message, { appearance: 'error' });
      })
  }

  function getAnimals(e) {
    if (e) e.preventDefault();
    api.get(`animals`, {
      page: 1,
      size: 10000
    })
      .then(response => {
        setAnimals(response.data)
      })
      .catch(e => {
        addToast(e.response.data.message, { appearance: 'error' });
      })
  }
  useEffect(() => {
    api.get(`pets/${id}`)
      .then(response => {
        setName(response.data.name);
        setColor(response.data.color);
        setAnimal(response.data.animal);
        setAnimalName(response.data.animalName);
      }).catch(e => {
        addToast(e.response.data.message, { appearance: 'error' });
      })
  }, [id, refreshPage])

  function updatePet(e) {
    if (e) e.preventDefault();
    api.patch(`pets/${id}`, {
      name, color, animal
    })
      .then(response => {
        setRefreshpage(refreshPage + 1)
        addToast('Pet salvo com sucesso', { appearance: 'success' });
        toggleModal();
      })
      .catch(e => {
        addToast(e.response.data.message, { appearance: 'error' });
      })
  }
  return (
    <div>
      <NavigationBar />
      <div>
        <Card>
          <CardBody className="card-body">
            <CardTitle className="card-title">{name}</CardTitle>
            <CardSubtitle >Cor: {color}</CardSubtitle>
            <CardText>Tipo: {animalName}</CardText>
            <Link className="btn btn-primary btn-block" to={'/pets'}>Voltar</Link>
            <Button onClick={toggleModal}>Alterar</Button>
          </CardBody>
        </Card>
      </div>

      <Modal isOpen={showModal} toggle={toggleModal} className="modal-lg" backdrop={'static'} keyboard={false}>
        <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
        <ModalBody>
          <div>
            <label className="control-label">{id}</label>

            <FormGroup>
              <Label className="control-label" for="nome">Nome</Label>
              <Input
                id="nome"
                className="form-control"
                placeholder="Nome do Pet"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label className="control-label" for="cor">Cor</Label>
              <Input
                id="cor"
                className="form-control"
                type="text"
                placeholder="Cor do animal"
                value={color}
                onChange={e => setColor(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label className="control-label" for="animal">Tipo do Pet</Label>
              <Input type="select" className="form-control" id="animal" value={animal} onChange={e => setAnimal(e.target.value)}>
                {animals.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </Input>
            </FormGroup>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
          <Button color="primary" onClick={updatePet}>Alterar</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}