const { Kafka } = require("kafkajs");

const kafkaClient = new Kafka({
	clientId: "cdc-app",
	brokers: ["localhost:9092"],
});

const pgConsumer = kafkaClient.consumer({ groupId: "orders-group" });

async function main() {
	await pgConsumer.connect();
	await pgConsumer.subscribe({
		topic: "shop.public.orders",
		fromBeginning: true,
	});
	await pgConsumer.run({
		autoCommit: false,
		eachMessage: async ({ message, topic, partition }) => {
			// const { key, value } = message;
			if (!message.value) {
				console.log("Empty message value");
				return;
			}
			console.log("consumer message:", {
				key: message.key.toString(),
				value: JSON.parse(message.value.toString()),
			});

			// ACK
			await pgConsumer.commitOffsets([
				{
					topic: topic,
					partition: partition,
					offset: (+message.offset + 1).toString(),
				},
			]);
		},
	});
}

main();
