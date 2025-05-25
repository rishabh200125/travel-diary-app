import TravelStory from "../models/travelStory.model.js"
import { errorHandler } from "../utils/error.js"

export const addTravelStory = async(req, res, next) => {
    const {title, story, visitedLocation, imageUrl, visitedDate } = req.body

    const userId = req.user.id

    //validate required fields
    if ( !title || !story || !visitedLocation || !imageUrl || !visitedDate ) {
        return next(errorHandler(400, "All fields are required"))
    }

    //convert visited date from milliseconds to Date object
    const parsedVisitedDate = new Date(parseInt(visitedDate))

    try {
        const travelStory = new TravelStory({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parsedVisitedDate
        })

        await travelStory.save();

        res.status(201).json({
            story: travelStory,
            message: "Your story is added successfully!",
        })
    } catch (error) {
        next(error)
    }
}