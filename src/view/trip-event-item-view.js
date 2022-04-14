import {createElement} from '../render';
import dayjs from 'dayjs';

const createTripEventsItemTemplate = (tripEvent) => {
  const {eventType, location, price, startDate, endDate, duration, offers, isFavorite} = tripEvent;
  const startDay = dayjs(startDate).format('MMM D');
  const beginDate = dayjs(startDate).format('YYYY-MM-D');
  const startTime = dayjs(startDate).format('HH:mm');
  const startDatetime = dayjs(startDate).format('YYYY-MM-DTHH:mm');
  const endTime = dayjs(endDate).format('HH:mm');
  const endDatetime = dayjs(endDate).format('YYYY-MM-DTHH:mm');
  const isFavoriteClass = isFavorite ? ' event__favorite-btn--active' : '';

  const createOfferMarkup = (offer) => {
    if (offer.isChosen) {
      const offerName = offer.name;
      const offerPrice = offer.price;
      return `<li class="event__offer">
                    <span class="event__offer-title">${offerName}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offerPrice}</span>
                  </li>`;
    }
    return '';
  };

  const getDuration = (interval) => {
    const timeDiff = [];
    if (interval.days !== 0) {
      timeDiff[0] = `${String(interval.days).padStart(2,'0')}D`;
    }
    if (interval.hours !== 0) {
      timeDiff[1] = `${String(interval.hours).padStart(2,'0')}H`;
    }
    if (interval.minutes !== 0) {
      timeDiff[2] = `${String(interval.minutes).padStart(2,'0')}M`;
    }
    return timeDiff.join(' ');
  };
  const durationText = getDuration(duration);
  const offersMarkup = offers.map(createOfferMarkup).join('');

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${beginDate}">${startDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${eventType} ${location}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startDatetime}">${startTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endDatetime}">${endTime}</time>
                  </p>
                  <p class="event__duration">${durationText}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">${offersMarkup}</ul>
                <button class="event__favorite-btn${isFavoriteClass}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};
export default class TripEventItemView {
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
    return createTripEventsItemTemplate(this.#event);
  }

  removeElement() {
    this.#element = null;
  }
}
