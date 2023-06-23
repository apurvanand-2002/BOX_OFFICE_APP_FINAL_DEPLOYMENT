import { useQuery } from "@tanstack/react-query";
import { useStarredShows } from "../lib/useStarredShows";
import { getShowsByIds } from "../api/tvmaze";
import ShowGrid from "../Components/shows/ShowGrid";
import { TextCenter } from "../Components/common/TextCenter";

const Starred = () => {
    const [starredShowsIds] = useStarredShows();
    //starred shows
    const { data: starredShows, error: starredShowsError } = useQuery({
        queryKey: ['starred', starredShowsIds],
        queryFn: async () => getShowsByIds(starredShowsIds).then(result => result.map(show => ({ show }))),
        refetchOnWindowFocus: false,
    })

    if (starredShows && starredShows.length === 0) {
        return <TextCenter>No shows were starred.</TextCenter>
    }
    if (starredShows && starredShows.length > 0) {
        return <ShowGrid shows={starredShows} />
    }
    if (starredShowsError) {
        return <TextCenter>Error occured: {starredShowsError.message}</TextCenter>
    }

    return <TextCenter>Shows are loading...</TextCenter>;
};
export default Starred;
