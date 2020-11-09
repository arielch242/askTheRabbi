import http from "../services/httpService";
import { apiUrl } from "../config.json";

export function getCard(cardId) {
  return http.get(`${apiUrl}/cards/${cardId}`);
}

export function getAllCards() {
  return http.get(`${apiUrl}/cards`);
}
export function setCard(card) {
  const { _id: cardId, ...bodycard } = card;
  return http.put(`${apiUrl}/cards/${cardId}`, bodycard);
}

export function AnswerCard(card) {
  const { _id: cardId, ...bodycard } = card;
  return http.put(`${apiUrl}/cards/${cardId}`, bodycard);
}

export function deleteCard(cardId) {
  return http.delete(`${apiUrl}/cards/${cardId}`);
}

export function createCard(card) {
  card["qAnswer"] ="";
  return http.post(`${apiUrl}/cards`, card);
}


export default { createCard, getAllCards, getCard, setCard, deleteCard, AnswerCard };
