import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const hexColors = ['#ffa99e', '#ffad42', '#35b099', '#66043a', '#1f8758'];
const GLOBS = [
  {
    text: "It is impossible to recognize an event, because an event is essentially distinct from every other event. the making of the difference is going to include the you that you’re becoming in the making of a difference. it’s you in relation the couch is a couch because it functions in a very particular way in relation to your movement “Recognition is an awareness of sameness. But to call recognition an awareness of sameness implies an intellectual act of comparison accompanied with judgment.” the recognition can’t be without judgement by judgement he means the making of a difference, not in the external sense think recognition as an ideal limit",
    chars: 646,
    color: '#ffa99e',
    theta: Math.random()*90 -45,
    phi: Math.random()*90 -45,
    alpha: Math.random()*90 -45
  },
  {
    text: "whitehead: what motors existence is feeling. Feeling is a kind of affective tonality that orients the world. World is oriented by quality.",
    chars: 138,
    color: '#ffad42',
    theta: Math.random()*90 -45,
    phi: Math.random()*90 -45,
    alpha: Math.random()*90 -45
  },
  {
    text: "In fact the character of an event is nothing but the objects which are ingredient in it and the ways in which those objects make their ingression into the event. as we unearth this concept of the object (which will not be what we think it is, it will go way beyond a couch) we’re going to recognize that the world is this, the things we call object - things that do not pass, that carry a certain consistency make all the difference concern is what makes a difference in the event” (whitehead says elsewhere)",
    chars: 508,
    color: '#35b099',
    theta: Math.random()*90 -45,
    phi: Math.random()*90 -45,
    alpha: Math.random()*90 -45
  }
];


function calcOffset(i) {
  var offsetY=0;
  for (let j=0; j<i; j++){
    offsetY += GLOBS[j].chars*0.5;
  }
  return offsetY;
}

class Plob extends React.Component {
  render(props) {
    var w = (this.props.characters*0.32)+'px';
    var h = (this.props.characters*0.66)+'px';
    const orientation = {
      left: this.props.x,
      top: this.props.y,
      width: 300,
      height: this.props.characters*0.5,
      color: this.props.color,
      transform: 'rotateX('+this.props.theta+'deg) rotateY('+this.props.phi+'deg) rotateZ('+this.props.alpha+'deg)',
      transformOrigin: 'center center'
    }
    return (
      <div className="roundfloat" style={orientation}>
      <img className="floatLeft" src={require("./left.png")} alt='ops' width={w} height={h}/>
      <img className="floatRight" src={require("./right.png")} alt='ops' width={w} height={h}/>
      <p className="plobtext">{this.props.text}</p>
      </div>
    );
  }
}

class NplusOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        displayTextForm: false,
        value: 'write here...'
      };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
  clearPrompt(event) {
    this.setState({
      displayTextForm: this.state.displayTextForm,
      value: ''
    });
  }
  displayTextForm() {
    this.setState({
      displayTextForm: !this.state.displayTextForm,
      value: this.state.value
    });
  }

  createPlob() {
    var data = {
      text: this.state.value,
      chars: this.state.value.split('').length,
      color: this.props.color,
      theta: this.props.theta,
      phi: this.props.phi,
      alpha: this.props.alpha
    }
    GLOBS.push(data);
    this.props.update();

    this.setState({
      displayTextForm: !this.state.displayTextForm,
      value: 'write here...'
    });
  }

  render() {
    const orientation = {
      left: this.props.x,
      top: this.props.y,
      transform: 'rotateX('+this.props.theta+'deg) rotateY('+this.props.phi+'deg) rotateZ('+this.props.alpha+'deg)',
      transformOrigin: 'center center'
    };
    if(this.state.displayTextForm){
      return(
        <div className="nplus1" style={orientation}>
          <form>

            <textarea
            className="textfield"
            rows="10"
            cols="34"
            style={{color: this.props.color}}
            value={this.state.value}
            onChange={this.handleChange}
            onFocus={() => this.clearPrompt()}/>

          </form>
          <button
          className="okie"
          type="button"
          onClick={() => this.createPlob()}>ok!
          </button>
        </div>
      )
    } else {
      return(
        <button
        className="nplus1"
        style={orientation}
        onClick={() => this.displayTextForm()}
        >
          n+1
        </button>
      )
    }
  }
}

class Chain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      length: true
    }
  }
  addToChain() {
    this.setState({
      length: true,
    })
  }

  render() {
    return (
      <div className="container">
        <div className="chain">
          {GLOBS.map((glob, index) => (
            <Plob
            key={glob.text.split(' ').splice(0, 3).join('')+index}
            x={100+200*Math.sin(index*Math.PI/12)}
            y={calcOffset(index)}
            color={glob.color}
            theta={glob.theta}
            phi={glob.phi}
            alpha={glob.alpha}
            text={glob.text}
            characters={glob.chars}/>
          ))}
          <NplusOne
          x={100+200*Math.sin(GLOBS.length*Math.PI/12)}
          y={calcOffset(GLOBS.length -1) + GLOBS[GLOBS.length-1].chars*0.5}
          theta={Math.random()*90 -45}
          phi={Math.random()*90 -45}
          alpha={Math.random()*90 -45}
          update={this.addToChain.bind(this)}
          color={hexColors[Math.floor(Math.random()*hexColors.length)]}
          />
        </div>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Chain />,
  document.getElementById('root')
);





// <div className="roundfloat" style={orientation}>
// <img className="floatLeft" src={require("./left.png")} alt='ops' width={w} height={h}/>
// <img className="floatRight" src={require("./right.png")} alt='ops' width={w} height={h}/>
// <p className="plobtext">{this.props.text}</p>
// </div>
