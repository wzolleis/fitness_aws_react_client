import * as PropTypes from "react/lib/ReactPropTypes"

export const ExercisePropType = PropTypes.shape({
    name: PropTypes.string,
});

export const ExercisesPropType = PropTypes.shape({
   isLoading: PropTypes.bool,
   values: PropTypes.arrayOf(ExercisePropType)
});