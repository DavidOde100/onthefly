import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import ActivityBtn from '../components/ActivityBtn';
import DestinationBtn from '../components/DestinationBtn';
import './TripDetails.css';

const TripDetails = ({ data }) => {
	const { id } = useParams();
	const tripId = parseInt(id, 10);
	const trip = data?.find((item) => item.id === tripId);
	const [activities, setActivities] = useState([]);
	const [destinations, setDestinations] = useState([]);

	useEffect(() => {
		const fetchActivities = async () => {
			const response = await fetch(`/api/activities/${id}`);
			const data = await response.json();
			setActivities(data);
		};

		const fetchDestinations = async () => {
			const response = await fetch(`/api/trips-destinations/destinations/${id}`);
			const data = await response.json();
			setDestinations(data);
		};

		fetchActivities();
		fetchDestinations();
	}, [id]);

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
				<div>
					<h3>Activities</h3>
					{activities && activities.length > 0 ? (
						activities.map((activity) => (
							<ActivityBtn
								key={activity.id}
								id={activity.id}
								activity={activity.activity}
								num_votes={activity.num_votes}
							/>
						))
					) : (
						<p>No activities added yet.</p>
					)}
				</div>
				<div>
					<h3>Destinations</h3>
					{destinations && destinations.length > 0 ? (
						destinations.map((destination) => (
							<DestinationBtn
								key={destination.id}
								id={destination.id}
								destination={destination.destination}
							/>
						))
					) : (
						<p>No destinations added yet.</p>
					)}
				</div>
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
