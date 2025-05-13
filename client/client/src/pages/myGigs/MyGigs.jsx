import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosFetch } from '../../utils';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms';
import { Loader } from '../../components';
import './MyGigs.scss';

const MyGigs = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['my-gigs'],
    queryFn: () =>
      axiosFetch(`/gigs?userID=${user._id}`)
        .then(({ data }) => {
          console.table(data);
          return data;
        })
        .catch(({ response }) => {
          console.log(response.data);
        })
  });

  const mutation = useMutation({
    mutationFn: (_id) => axiosFetch.delete(`/gigs/${_id}`),
    onSuccess: () => queryClient.invalidateQueries(['my-gigs'])
  });

  const handleGigDelete = (gig, e) => {
    e.stopPropagation();
    mutation.mutate(gig._id);
    toast.success(gig.title + ' deleted successfully!');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='myGigs'>
      {
        isLoading
          ? <div className='loader'> <Loader size={35} /> </div>
          : error
            ? <div className="error-message">Something went wrong. Please try again.</div>
            : <div className="container">
              <div className="title">
                <h1>My Gigs</h1>
                <Link to='/organize' className='link'>
                  <button className="add-gig-btn">Add New Gig</button>
                </Link>
              </div>
              
              {data.length === 0 ? (
                <div className="empty-state">
                  <img src="./media/empty-folder.png" alt="No gigs" />
                  <h3>You don't have any gigs yet</h3>
                  <p>Start by creating your first gig to showcase your services</p>
                  <Link to='/organize' className='link'>
                    <button className="add-gig-btn">Create Your First Gig</button>
                  </Link>
                </div>
              ) : (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Sales</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((gig) => (
                        <tr 
                          key={gig._id} 
                          onClick={() => navigate(`/gig/${gig._id}`)}
                          className="gig-row"
                        >
                          <td>
                            <img
                              className="cover"
                              src={gig.cover}
                              alt={gig.title}
                            />
                          </td>
                          <td>{gig.title}</td>
                          <td>{gig.price.toLocaleString("en-IN", {
                            maximumFractionDigits: 0,
                            style: "currency",
                            currency: "INR",
                          })}</td>
                          <td>{gig.sales}</td>
                          <td>
                            <button 
                              className="delete-btn"
                              onClick={(e) => handleGigDelete(gig, e)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
      }
    </div>
  )
}

export default MyGigs;