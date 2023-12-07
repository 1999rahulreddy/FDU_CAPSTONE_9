import React, { Component } from 'react';
import axios from 'axios';
import './UploadTestCasePage.css';

class UploadTestCasePage extends Component {
    state = {
        profId: 1, // Assuming this is retrieved from the teacher's login information or session
        courseId: this.props.match.params.courseId, // Retrieved from URL params
        assignNo: this.props.match.params.assignmentId, // Retrieved from URL params
        inputOutputPairs: [{ input: '', output: '', problemDetails: '' }],
    };

    handleInputChange = (index, event) => {
        const newInputOutputPairs = this.state.inputOutputPairs.map((pair, pairIndex) => {
            if (index !== pairIndex) return pair;
            return { ...pair, [event.target.name]: event.target.value };
        });
        this.setState({ inputOutputPairs: newInputOutputPairs });
    };

    handleAddPair = () => {
        this.setState({
            inputOutputPairs: this.state.inputOutputPairs.concat([{ input: '', output: '', problemDetails: '' }])
        });
    };

    handleRemovePair = (index) => {
        this.setState({
            inputOutputPairs: this.state.inputOutputPairs.filter((_, pairIndex) => index !== pairIndex)
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { profId, courseId, assignNo, inputOutputPairs } = this.state;
        try {
            const headers = {
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            };
            await axios.post('http://127.0.0.1:8000/api/prof/upload_testcase/', {
                prof_id: profId,
                course_id: courseId,
                assign_no: assignNo,
                input_output_pairs: inputOutputPairs
            }, { headers });

            // Handle success (e.g., showing a success message or redirecting)
            this.setState({ uploadSuccess: true });

            // Redirect after a short delay to show the success message
            setTimeout(() => {
                this.props.history.push(`/teacher-assignments/${courseId}`);
            }, 1000); // Redirect after 2 seconds
            this.showSuccessModal();
        } catch (error) {
            console.error('There was an error uploading the test cases:', error);
            // Handle error (e.g., showing an error message)
        }
    };

    renderInputOutputPair(pair, index) {
    return (
      <div key={index} className="form-group">
        <label>Input:</label>
        <input
          type="text"
          name="input"
          value={pair.input}
          onChange={(event) => this.handleInputChange(index, event)}
        />

        <label>Output:</label>
        <input
          type="text"
          name="output"
          value={pair.output}
          onChange={(event) => this.handleInputChange(index, event)}
        />

        <label>Problem Details (optional):</label>
        <textarea
          name="problemDetails"
          value={pair.problemDetails}
          onChange={(event) => this.handleInputChange(index, event)}
        />

        {this.state.inputOutputPairs.length > 1 && (
          <button
            type="button"
            className="remove-btn"
            onClick={() => this.handleRemovePair(index)}
          >
            Remove
          </button>
        )}
      </div>
    );
  }


    render() {
        return (
      <div className="container">
        <h2>Upload Test Cases for Assignment</h2>
         {this.state.uploadSuccess && (
                    <div className="alert alert-success">
                        Test cases uploaded successfully!
                    </div>
                )}
        <form onSubmit={this.handleSubmit}>
          {this.state.inputOutputPairs.map((pair, index) =>
            this.renderInputOutputPair(pair, index)
          )}
          <button
            type="button"
            className="add-pair-btn"
            onClick={this.handleAddPair}
          >
            Add Another Pair
          </button>
          <button type="submit" className="submit-btn">
            Submit Test Cases
          </button>
        </form>
      </div>
    );
    }
}

export default UploadTestCasePage;
