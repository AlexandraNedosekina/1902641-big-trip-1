import dayjs from 'dayjs';
import {locations} from '../mock/locations';
import {eventTypes} from '../mock/event-types';
import {createElement} from '../render';

const createAddEventItemTemplate = (tripEvent) => {
  const {offers, description, photos} = tripEvent;
  const eventType = 'Check-in';
  const templateDatetime = dayjs().add(17, 'day').hour(12).minute(0).format('D/MM/YY HH:mm');

  const createOfferMarkup = (offer) => {
    const {name, price, type} = offer;
    return `<div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-${type}" >
                        <label class="event__offer-label" for="event-offer-name-1">
                          <span class="event__offer-title">${name}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${price}</span>
                        </label>
                      </div>
    `;
  };

  const createOffersListMarkup = (addableOffers) => {
    if (addableOffers.length !== 0){
      return `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${offers.map(createOfferMarkup).join('')}</section>`;
    }
    return '';
  };
  const createPhotoMarkup = (photo) => (`<img className="event__photo" src="${photo}">`);
  const createLocationOption = (city) => (`<option value="${city}"></option>`);
  const createEventTypesMarkup = (types = eventTypes(), chosenEventType) => {
    const createType = (currentType) => {
      const isChecked = currentType === chosenEventType ? 'checked=""' : '';
      const label = currentType.charAt(0).toUpperCase() + currentType.slice(1);
      return `<div class="event__type-item">
                          <input id="event-type-${currentType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${currentType}" ${isChecked}>
                          <label class="event__type-label  event__type-label--${currentType}" for="event-type-${currentType}-1">${label}</label>
                        </div>`;
    };
    return types.map(createType).join('');
  };
  const addableOffersMarkup = createOffersListMarkup(offers);
  const photosList = photos.map(createPhotoMarkup).join('');
  const locationOptions = locations().map(createLocationOption).join('');
  const eventTypesMarkup = createEventTypesMarkup(eventTypes(), eventType);
  const eventTypeLabel = eventType.charAt(0).toUpperCase() + eventType.slice(1);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${eventTypesMarkup}
                      </fieldset>
                    </div>
                  </div>
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${eventTypeLabel}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${locationOptions}
                    </datalist>
                  </div>
                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${templateDatetime}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${templateDatetime}">
                  </div>
                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>
                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  ${addableOffersMarkup}
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosList}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};

export default class AddEventItemView {
  #element = null;
  #event = null;

  constructor(event) {
    this.#event = event;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createAddEventItemTemplate(this.#event);
  }

  removeElement() {
    this.#element = null;
  }
}

