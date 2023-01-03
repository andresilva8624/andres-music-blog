// these queries are here for example ONLY
import { QUERY_USERS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
// END example

function About() {
	const { loading, data } = useQuery(QUERY_USERS);

	const users = data?.users || [];

	return (
		<h3>
			On this Music-Blog, you can watch the YouTube videos, rate them, comment and make a response video playing the song. You can also download the tab once you Sign Up and Login. The videos are from Classic Rock songs to Brazilian Bossa Nova. Please send your requests, I'll be happy to play them. Stay tuned for more uploads. Enjoy and Rock on 😀 🎸 
			
	

			{loading ? (
				<div>Loading ...</div>
				
			) : (
					<div>
						{users.map(user => {
							return <p key={user._id}></p>
						})}
					</div>
			)}
			

		</h3>
		
		
	);
}

export default About;