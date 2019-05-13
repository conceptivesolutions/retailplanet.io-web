/* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for,object-curly-newline,no-underscore-dangle */
import * as React from 'react';
import { Button, Form, Image, Label, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import css from './_account.scss';
import { isAdmin, updateAvatar } from '../../helpers/rest/userHelper';

/**
 * Account Sub-Page in Profile
 *
 * @author w.glanzer, 08.05.2019
 */
class Account extends React.Component {
  state = {
    loading: 0, // Count of current loading tasks
    error: '',
    uploads: {
      avatar: null,
      avatar_timestamp: Date.now(), // Timestamp, when the avatar was uploaded
    },
  };

  constructor(props, context) {
    super(props, context);
    this._applyChanges = this._applyChanges.bind(this);
  }

  _applyChanges(e) {
    e.preventDefault();
    const { avatar } = this.state.uploads;
    if (avatar)
      if (avatar.size > 1024 * 1024) // 5MB max
        this.setState({ error: this.context.t('profile_err_imgTooBig', { max: 5 }) });
      else {
        this._updateAvatar(avatar);
        e.target.file.value = ''; // Reset upload field
      }
  }

  _updateAvatar(pAvatarFile) {
    const reader = new FileReader();
    reader.onloadstart = () => this.setState(state => ({ loading: state.loading + 1 }));
    reader.onerror = () => this.setState(state => ({ loading: state.loading - 1 }));
    reader.onabort = reader.onerror;
    reader.onload = () => {
      updateAvatar(this.props.user, btoa(reader.result))
        .finally(() => {
          this.setState(state => ({
            loading: state.loading - 1,
            uploads: {
              avatar: null,
              avatar_timestamp: Date.now(),
            },
          }));
        });
    };
    reader.readAsBinaryString(pAvatarFile);
  }

  render() {
    const { t } = this.context;
    const { profile } = this.props;
    if (!profile)
      return <React.Fragment />;

    return (
      <React.Fragment>
        <h1>
          {t('profile_account')}
          {this.props.admin ? <Label color="teal" className={css.id}>{profile.id}</Label> : null}
        </h1>
        <Form loading={this.state.loading > 0} onSubmit={this._applyChanges}>
          <Form.Group widths="equal">
            <Form.Input label={t('profile_firstname')} placeholder={t('profile_firstname')} defaultValue={profile.name.givenName} />
            <Form.Input label={t('profile_lastname')} placeholder={t('profile_lastname')} defaultValue={profile.name.familyName} />
          </Form.Group>
          <Form.Input label={t('profile_username')} placeholder={t('profile_username')} defaultValue={profile.username} />
          <Form.Input label={t('profile_email')} placeholder={t('profile_email')} defaultValue={profile.email} />
          <Form.Group widths="equal">
            <Form.Field>
              <label>{t('profile_avatar')}</label>
              <Image rounded className={css.avatar} key={this.state.uploads.avatar_timestamp}
                src={`/api/profile/avatar/${encodeURIComponent(profile.id)}.png`} />
            </Form.Field>
            <Form.Input onChange={e => this.setState({
              uploads: {
                avatar: e.target.files[0],
              },
            })} name="file" type="file" label={t('profile_uploadAvatar')} accept=".png,.jpg,.jpeg" />
          </Form.Group>
          <Button type="submit" primary>{t('apply')}</Button>
          <Message error header={t('profile_err')} content={this.state.error} visible={!!this.state.error} />
        </Form>
      </React.Fragment>
    );
  }
}

Account.contextTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  admin: isAdmin(state.user),
  profile: state.user ? state.user.profile : null,
});

export default connect(mapStateToProps)(Account);
