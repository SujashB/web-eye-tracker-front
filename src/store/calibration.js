import axios from 'axios';
export default {
    state: {
        calibName: '',
        pointNumber: 5,
        samplePerPoint: 10,
        radius: 20,
        offset: 50,
        pattern: [],
    },
    mutations: {
        setCalibName(state, value) {
            state.calibName = value
        },
        setSamplePerPoint(state, value) {
            state.samplePerPoint = value;
        },
        setRadius(state, value) {
            state.radius = value;
        },
        setOffset(state, value) {
            state.offset = value;
        },
        setPointNumber(state, value) {
            state.pointNumber = value
        },
        setPattern(state, value) {
            state.pattern = value
        }
    },
    actions: {
        async sendData(context, data) {
            let formData = new FormData();
            formData.append(
                "file_name",
                JSON.stringify(context.state.calibName)
            )
            formData.append(
                "fixed_circle_iris_points",
                JSON.stringify(data.circleIrisPoints)
            );
            formData.append(
                "calib_circle_iris_points",
                JSON.stringify(data.calibPredictionPoints)
            );
            formData.append("screen_height",
                JSON.stringify(data.screenHeight)
            );
            formData.append("screen_width",
                JSON.stringify(data.screenWidth)
            );
            const res = await axios.post(`/api/session/calib_validation`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
        }
    }
}