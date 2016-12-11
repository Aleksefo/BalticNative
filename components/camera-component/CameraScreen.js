import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import ImageForm from './ImageForm';
import CameraTakePhoto from './CameraTakePhoto';

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);

    this.setPhoto = this.setPhoto.bind(this);
    this.setCaption = this.setCaption.bind(this);
    this.state = {
      photo: {},
      caption: ''
    };
  }


  setPhoto(photo) {
    this.setState({ photo });
  }

  setCaption(caption) {
    this.setState({ caption });
  }

  render() {

    let cameraComponent;
    let imageForm;

	  cameraComponent = <CameraTakePhoto setPhoto={this.setPhoto} />;


    if (this.state.photo.uri) {
      imageForm = (<ImageForm
        photo={this.state.photo}
        caption={this.state.caption}
        setCaption={this.setCaption}
        setPhoto={this.setPhoto}
      />);
    }

    return (
      <View style={styles.container}>
        <ScrollView>

          { cameraComponent }

          { imageForm }
			<Text >HELOOOOOOOOOOOOOOO</Text>
        </ScrollView>
      </View>
    );
  }
}
/*
CameraScreen.route = {
  navigationBar: {
    visible: true,
    renderTitle: () => <Header headerText={'Camera'} />,
    backgroundColor: '#242134',
    tintColor: '#f1edd2'
  }
};
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },

  segmentedControls: {
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default CameraScreen;
