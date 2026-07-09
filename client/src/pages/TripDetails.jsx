import { Link, useParams } from 'react-router';
import './TripDetails.css';

const TripDetails = ({ data }) => {
	const { id } = useParams();
	const tripId = parseInt(id, 10);
	const trip = data?.find((item) => item.id === tripId);

	if (!trip) {
		return <h2 className="noResults">Trip not found</h2>;
	}

	return (
		<div className="flex-container">
			<div>
				<h2>{trip.title}</h2>
				<p>{trip.description}</p>
				<p>Start: {trip.start_date?.slice(0, 10)}</p>
				<p>End: {trip.end_date?.slice(0, 10)}</p>
				<p>Duration: {trip.num_days} days</p>
				<p>Total Cost: {trip.total_cost}</p>
				<Link to={`/destination/new/${trip.id}`}>
					<button className="addDestinationBtn">+ Add Destination</button>
				</Link>
				<Link to={`/activity/create/${trip.id}`}>
					<button className="addActivityBtn">+ Add Activity</button>
				</Link>
			</div>

			<div
				className="right-side"
				style={{ backgroundImage: `url(${trip.img_url})` }}
				aria-label={`${trip.title} cover image`}
			/>
		</div>
	);
};

export default TripDetails;
