import {render, RenderPosition} from './render.js';
import TripTabsView from './view/trip-tabs-view.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripSortView from './view/trip-sort-view.js';
import AddEventItemView from './view/add-event-item-view.js';
import EventItemEditView from './view/edit-event-item-view';
import TripEventItemView from './view/trip-event-item-view.js';
import EventsListView from './view/events-list-view.js';
import {generateTripEvent} from './mock/trip-event';

const TRIP_EVENTS_COUNT = 18;

const tripEvents = Array.from({length: TRIP_EVENTS_COUNT}, generateTripEvent);

const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripEventsListElement = new EventsListView();

render(tripEventsElement, tripEventsListElement.element, RenderPosition.BEFOREEND );
render(tripControlsNavigationElement, new TripTabsView().element, RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFiltersView().element, RenderPosition.BEFOREEND);
render(tripEventsElement, new TripSortView().element, RenderPosition.AFTERBEGIN);
render(tripEventsListElement.element, new AddEventItemView(tripEvents[1]).element, RenderPosition.BEFOREEND);
//render(tripEventsListElement, new AddEventItemView(tripEvents[0]).element, RenderPosition.BEFOREEND);

const renderEvent = (eventListElement, event) => {
  const eventItemComponent = new TripEventItemView(event);
  const eventEditComponent = new EventItemEditView(event);

  const replaceFormToItem = () => {
    eventListElement.replaceChild(eventItemComponent.element, eventEditComponent.element);
  };
  const replaceItemToForm = () => {
    eventListElement.replaceChild(eventEditComponent.element, eventItemComponent.element);
  };
  const onEscKeyDown = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  eventItemComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceItemToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToItem();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, eventItemComponent.element, RenderPosition.BEFOREEND);
};

for (let i = 1; i < TRIP_EVENTS_COUNT; i++) {
  renderEvent(tripEventsListElement.element, tripEvents[i]);
}

