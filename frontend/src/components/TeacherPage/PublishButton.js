import React from 'react'
import { Button } from 'semantic-ui-react'

import gql from 'graphql-tag'

const updateExam = gql`
	mutation updateExam($id: ID!, $data: ExamUpdateInput!) {
		updateExam(where: { id: $id }, data: $data) {
			id
		}
	}
`

const PublishButton = ({ highlightColor, examId, status, client }) => {
	const published = !status ? true : false
	return (
		<Button
			size={'small'}
			basic
			color={highlightColor}
			onClick={async () => {
				await client.mutate({
					mutation: updateExam,
					variables: { id: examId, data: { published } }
				})
				window.location.reload()
			}}>
			{published ? 'Publish' : 'Unpublish'}
		</Button>
	)
}

export default PublishButton
