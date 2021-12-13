import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getExercises, clearExercises } from '../../modules/exercises/actions';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ExerciseCart from './ExerciseCart';
import InfiniteScroll from 'react-infinite-scroll-component';

const Exercises = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const exercises = useSelector(state => state.exercises.exercises);
  const loading = useSelector(state => state.exercises.loading);
  const hasMore = useSelector(state => state.exercises.pagination.next);

  useEffect(() => {
    dispatch(getExercises(page));
    setPage(page + 1);
    return () => {
      dispatch(clearExercises());
    }
  }, [])

  return (
    <Box>
      {
        loading ? <CircularProgress /> :
          <InfiniteScroll
            dataLength={exercises.length} //This is important field to render the next data
            next={() => {
              setPage(page + 1);
              console.log(page)
              dispatch(getExercises(page));
            }}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Grid container spacing={2} style={{ padding: '20px' }}>
              {
                exercises.map(exercise => (
                  <Grid item xs={3} key={exercise.id}>
                    <ExerciseCart exercise={exercise} />
                  </Grid>
                ))
              }
            </Grid>
          </InfiniteScroll>
      }
    </Box >
  )
}

export default Exercises;